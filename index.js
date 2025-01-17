
document.addEventListener("DOMContentLoaded", function () {

    // 平滑滚动
    const lenis = new Lenis()
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)


    // 图片滚动
    const services = gsap.utils.toArray(".service")
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    }
    const observerCallback = (entris, observer) => {
        entris.forEach(entry => {
            if (entry.isIntersecting) {
                const service = entry.target
                const imgContainer = service.querySelector(".img")

                ScrollTrigger.create({
                    trigger: service,
                    start: "bottom bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress
                        let newWidth = 30 + 70 * progress
                        gsap.to(imgContainer, {
                            width: newWidth + '%',
                            duration: 0.1,
                            ease: "none"
                        })
                    }
                })

                ScrollTrigger.create({
                    trigger: service,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress
                        let newHeight = 150 + 300 * progress
                        gsap.to(service, {
                            height: newHeight + 'px',
                            duration: 0.1,
                            ease: "none"
                        })
                    }
                })

                observer.unobserve(service)
            }
        });
    }


    const observer = new IntersectionObserver(observerCallback, observerOptions)
    services.forEach((service) => {
        observer.observe(service)
    })
})