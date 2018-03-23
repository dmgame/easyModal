(function ($){
    class Modal{
        constructor(element, options) {
            this.default = {
                closeClass: 'close-modal',
                autoClose: false,
                autoCloseTime: 1000,
                opacity: 0.7,
                position: 'center',
                duration: 500
            };
            this.element = element;
            this.overlay = $(`<div class="overlay"></div>`);
            this.options = $.extend(this.default, options);
        }

        init() {
            // Save this
            const self = this;
            // Add overlay
            this.addOverlay(self);
            // Show modal
            this.showModal();
            // Set events
            this.events();
        }

        events(){
            // Close modal by overlay
            this.overlay.on('click', (e) => this.hideModal());
            $(`.${this.options.closeClass}`).on('click', (e) => this.hideModal());
        }

        addOverlay(self) {
            // Setup styles
            this.overlay.css({
                'display': 'block',
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'right': '0',
                'bottom': '0',
                'opacity': 1,
                'background-color': `rgba(0, 0, 0, ${this.options.opacity})`,
                'z-index': '999'
            });

            // Append overlay
            this.element.before(this.overlay);
        }

        showModal() {
            // Get width, height
            const width = this.element.outerWidth();
            const height = this.element.outerHeight();

            this.element.css({
                'display': 'block',
                'position': 'fixed',
                'top': '50%',
                'left': '50%',
                'z-index': '1000',
                'opacity': 0,
                'margin-top': `-${height / 2}px`,
                'margin-left': `-${width / 2}px`,
            }).animate({
                opacity: 1
            }, this.options.duration);
        }

        hideOverlay() {
            // hide overlay
            this.overlay.animate({
                'opacity': 0
            }, this.options.duration, () => {
                this.overlay.css({
                    'display': 'none'
                })
            });
        }

        hideModal() {
            console.log(this.options.duration);
            // hide modal
            this.element.animate({
                'opacity': 0
            }, this.options.duration, () => {
                this.element.css({
                    'display': 'none'
                });
            });
            // hide overlay
            this.hideOverlay();
        }
    }
    
    $.fn.easyModal = function(options) {
        // create modal
        new Modal(this, options).init();
    }
}(jQuery));