import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import Lenis from 'lenis'

const vertexShader = `
  uniform float uScrollSpeed;
  uniform float uPlaneWidth;
  uniform float uFoldHeight;
  uniform float uFoldWidth;
  uniform float uProgress;
  uniform float uTime;
  uniform float uId;
  varying vec2 vUv;
  #define PI 3.141592653

  void main() {
    vec3 pos = position;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    float displacement = sin(worldPosition.x * 2.0 + uTime * 0.5) * cos(worldPosition.y * 1.5 + uTime * 0.3) * 0.1;
    pos.z += displacement;
    float wave = sin(pos.x * 1.0 + uTime + uId) * 0.1;
    float yDisplacement = (uScrollSpeed * 0.1) + (wave * 0.5);
    pos.y += yDisplacement;
    pos.x += sin(pos.y * 1.5 + uTime + uId) * 0.1;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uScrollSpeed;
  uniform float uPlaneWidth;
  uniform float uFoldHeight;
  uniform float uFoldWidth;
  uniform float uProgress;
  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    vec3 color = tex.rgb * (0.85 + 0.15 * sin(uScrollSpeed * 10.0));
    float fold = 0.0;
    if (uFoldWidth > 0.0) {
      float x = vUv.x;
      float foldCount = 1.0;
      float foldIndex = floor(x * foldCount);
      float foldX = fract(x * foldCount);
      float foldDirection = mod(foldIndex, 2.0) * 2.0 - 1.0;
      float foldAngle = foldX * 3.14159265 * 0.5 * uFoldWidth * foldDirection;
      float foldIntensity = abs(foldDirection);
      float foldShadow = smoothstep(0.0, 0.2, foldX) * (1.0 - smoothstep(0.8, 1.0, foldX)) * 0.2 * foldIntensity;
      float foldHighlight = (1.0 - smoothstep(0.0, 0.1, abs(foldX - 0.5))) * 0.1 * foldIntensity;
      vec3 foldNormal = normalize(vec3(-sin(foldAngle), 0.0, cos(foldAngle)));
      float foldLighting = max(0.0, dot(foldNormal, vec3(0.0, 0.0, 1.0)));
      fold = foldShadow + foldHighlight + foldLighting * 0.1;
    }
    color += vec3(fold);
    gl_FragColor = vec4(color, tex.a);
  }
`

interface ImageInfo {
  src: string
  texture: THREE.Texture
  imgElement: HTMLImageElement
}

export default function ShaderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const imageSources = [
      '/images/img-hero-1.jpg',
      '/images/img-hero-2.jpg',
      '/images/img-hero-3.jpg',
      '/images/img-hero-4.jpg',
      '/images/img-hero-5.jpg',
    ]

    const N = imageSources.length
    let width = window.innerWidth
    let height = window.innerHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Load textures
    const textureLoader = new THREE.TextureLoader()
    const imageInfos: ImageInfo[] = []

    let loadedCount = 0
    const onAllLoaded = () => {
      if (loadedCount < N) return
      buildScene()
    }

    imageSources.forEach((src, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const texture = textureLoader.load(src)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        imageInfos[i] = { src, texture, imgElement: img }
        loadedCount++
        onAllLoaded()
      }
      img.src = src
    })

    let meshes: THREE.Mesh[] = []
    let initialPositions = new Float32Array(N)
    let totalWidth = 0
    let totalScrollableWidth = 0
    let planeWidthArr: number[] = []
    let geometry: THREE.PlaneGeometry

    function buildScene() {
      geometry = new THREE.PlaneGeometry(1, 1, 16, 16)

      const imageSizes: { width: number; height: number; aspect: number }[] = []

      for (let i = 0; i < N; i++) {
        const img = imageInfos[i].imgElement
        const aspect = img.width / img.height
        let h = window.innerHeight * 0.6
        if (window.innerWidth < 768) {
          h = window.innerHeight * 0.5
        }
        const w = h * aspect
        imageSizes.push({ width: w, height: h, aspect })
      }

      const gap = window.innerWidth * 0.05
      totalWidth = 0
      planeWidthArr = []

      imageSizes.forEach((size, i) => {
        const scaleFactor = 0.0045
        const w = size.width * scaleFactor
        planeWidthArr.push(w)
        if (i === 0) {
          totalWidth += w / 2
        } else {
          totalWidth += planeWidthArr[i - 1] / 2 + gap * 0.45 + w / 2
        }
      })

      let xOffset = -totalWidth / 2
      initialPositions = new Float32Array(N)

      for (let i = 0; i < N; i++) {
        const size = imageSizes[i]
        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTexture: { value: imageInfos[i].texture },
            uScrollSpeed: { value: 0.0 },
            uPlaneWidth: { value: planeWidthArr[i] },
            uFoldHeight: { value: 1.0 },
            uFoldWidth: { value: 0.3 },
            uProgress: { value: i / (N - 1) },
            uTime: { value: 0.0 },
            uId: { value: i },
          },
          transparent: true,
        })

        const mesh = new THREE.Mesh(geometry, material)
        const scaleFactor = 0.0045
        mesh.scale.set(size.width * scaleFactor, size.height * scaleFactor, 1)

        if (i > 0) {
          xOffset += planeWidthArr[i - 1] / 2 + gap * 0.45 + planeWidthArr[i] / 2
        }
        mesh.position.x = xOffset
        initialPositions[i] = xOffset

        scene.add(mesh)
        meshes.push(mesh)
      }

      totalScrollableWidth = totalWidth + window.innerWidth * 0.5

      // Start animation loop
      animate()
    }

    // Lenis scroll
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.4,
      infinite: true,
    })

    let currentScroll = 0
    let scrollSpeed = 0
    let targetScroll = 0

    lenis.on('scroll', (e: { animatedScroll: number }) => {
      targetScroll = e.animatedScroll % totalScrollableWidth
    })

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    function animate() {
      const prevScroll = currentScroll
      currentScroll += (targetScroll - currentScroll) * 0.08
      scrollSpeed = currentScroll - prevScroll

      const time = performance.now() / 1000

      for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i]
        mesh.position.x =
          ((initialPositions[i] - currentScroll * 0.005) % totalScrollableWidth +
            totalScrollableWidth) %
            totalScrollableWidth -
          totalScrollableWidth / 2

        const centerOffset = i / (N - 1) - 0.5
        const mat = mesh.material as THREE.ShaderMaterial
        mat.uniforms.uScrollSpeed.value =
          scrollSpeed * 0.005 * (1.0 + Math.abs(centerOffset))
        mat.uniforms.uProgress.value =
          (currentScroll + i * 500) / (N * 500)
        mat.uniforms.uTime.value = time
      }

      renderer.render(scene, camera)
      frameRef.current = requestAnimationFrame(animate)
    }

    // Resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth
        height = window.innerHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)

        // Recompute image sizes
        if (meshes.length > 0) {
          const imageSizes: { width: number; height: number; aspect: number }[] = []
          for (let i = 0; i < N; i++) {
            const img = imageInfos[i]?.imgElement
            if (!img) continue
            const aspect = img.width / img.height
            let h = window.innerHeight * 0.6
            if (window.innerWidth < 768) {
              h = window.innerHeight * 0.5
            }
            const w = h * aspect
            imageSizes.push({ width: w, height: h, aspect })
          }

          const gap = window.innerWidth * 0.05
          totalWidth = 0
          planeWidthArr = []

          imageSizes.forEach((size, i) => {
            const scaleFactor = 0.0045
            const w = size.width * scaleFactor
            planeWidthArr.push(w)
            if (i === 0) {
              totalWidth += w / 2
            } else {
              totalWidth += planeWidthArr[i - 1] / 2 + gap * 0.45 + w / 2
            }
          })

          totalScrollableWidth = totalWidth + window.innerWidth * 0.5

          // Update scales
          const scaleFactor = 0.0045
          meshes.forEach((mesh, i) => {
            if (imageSizes[i]) {
              mesh.scale.set(
                imageSizes[i].width * scaleFactor,
                imageSizes[i].height * scaleFactor,
                1
              )
            }
          })

          // Recompute positions
          let xOffset = -totalWidth / 2
          meshes.forEach((mesh, i) => {
            if (i > 0) {
              xOffset +=
                planeWidthArr[i - 1] / 2 + gap * 0.45 + planeWidthArr[i] / 2
            }
            mesh.position.x = xOffset
            initialPositions[i] = xOffset
            const mat = mesh.material as THREE.ShaderMaterial
            mat.uniforms.uPlaneWidth.value = planeWidthArr[i]
          })
        }
      }, 200)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(frameRef.current)
      lenis.destroy()
      renderer.dispose()
      geometry?.dispose()
      meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial
        mat.dispose()
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
