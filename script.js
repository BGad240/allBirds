

// sidebar

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



// active tabs

 function tabsHandler(defaultTab) {
    return {
      activeTab: defaultTab,
      setActive(tab) {
        this.activeTab = tab;
      },
      tabClass(tab) {
        return this.activeTab === tab
          ? 'text-gray-900 border-gray-800'
          : 'text-gray-500 border-transparent';
      },
    }
}



// explore products details section in details.html

function toggleSizeMenu(){
    return{
        isOpen: false,
        toggle(){
            this.isOpen = !this.isOpen
        },
        hide(){
            this.isOpen = false
        },
        transitionIn: "transition ease-out duration-500 opacity-100 scale-100",
        transitionOut: "transition ease-in duration-75 opacity-0 scale-95"

    }
}


//filter migamenu for filter button from products.html

function modalHandler() {
  return {
    isOpen: false,
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    }
  };
}


// header function
function smartHeader(offset = 80) {
  return {
    lastScroll: 0,
    hidden: false,
    offset,
    init() {
      
      this.lastScroll = window.pageYOffset;
      window.addEventListener('scroll', () => this.handleScroll());
    },
    handleScroll() {
      const currentScroll = window.pageYOffset;
      
      
      if (currentScroll <= this.offset) {
        this.hidden = false;
      } 
      
      else if (currentScroll > this.lastScroll) {
        this.hidden = true;
      } 
      
      else if (currentScroll < this.lastScroll) {
        this.hidden = false;
      }

      
      this.lastScroll = currentScroll;
    }
  }
}



