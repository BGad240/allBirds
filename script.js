// side

function sideBarController() {
    return {
        active: 0,
        previous: 0,
        slideTo(num) {
            this.previous = this.active;
            this.active = num;
        },
        direction(num) {
            if (this.active === num) return 'translate-x-0';
            return (this.active > num) ? '-translate-x-[200%]' : 'translate-x-full';
        }
    }
}





document.addEventListener('alpine:init', () => {
    Alpine.store('sidebar', {
        isOpen: false,
        toggle() {
            const el = document.getElementById('mobile-sidebar');

            if (!this.isOpen) {
                el.style.display = 'block';
                el.classList.add('opacity-0', 'transition', 'duration-500');
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        el.classList.remove('opacity-0');
                    });
                });
            } else {
                el.classList.add('opacity-0');
                setTimeout(() => {
                    el.style.display = 'none';
                }, 500);
            }

            this.isOpen = !this.isOpen;
        }
    });
});




/**
 * scrol animation for details page
 */


function sectionAnimation() {
    return {
        visible: false,
        startOffset: 0,
        init() {

            this.startOffset = this.$refs.section.offsetHeight / 2;

            let observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.visible = entry.isIntersecting;
                });
            }, { threshold: 0.3 });

            observer.observe(this.$refs.section);
        }
    }
}



// cart sidebar
document.addEventListener('alpine:init', () => {
    Alpine.store('cart', {
        open: false,
        toggle() {
            this.open = !this.open;
        },
        show() {
            this.open = true;
        },
        hide() {
            this.open = false;
        }
    });
});


// megamenu




document.addEventListener('alpine:init', () => {
    Alpine.store('megaMenu', {
        open: false,
        show() {
            this.open = true;
            document.getElementById('mega-menu-modal').classList.remove('hidden');
        },
        hide() {
            this.open = false;
            document.getElementById('mega-menu-modal').classList.add('hidden');
        },
        toggle() {
            this.open ? this.hide() : this.show();
        }
    });
});