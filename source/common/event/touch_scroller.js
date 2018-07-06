/**
	JavaScript implementation of a touch scrolling interface using touch events
*/
class TouchScroller {
    /** 
        Constructs a touch object around a given dom element. Functions listeners can be bound to this object using
        this addEventListener method.
    */
    constructor(element, drag = 0.02, touchid = 0) {
        
        this.origin_x = 0;
        this.origin_y = 0;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.GO = true;
        this.drag = (drag > 0) ? drag : 0.02;
        this.element = element;

        if (!touchid instanceof Number)
            touchid = 0;

        let time_old = 0;

        let frame = (dx, dy, steps, ratio = 1) => {

            let drag_val = this.drag;

            dx -= dx * drag_val * steps * ratio;
            dy -= dy * drag_val * steps * ratio;

            let dm = Math.max(Math.abs(dy), Math.abs(dy));

            let end = !(steps > 0 && dm > 0.1 && this.GO);

            if (!end) {
                requestAnimationFrame(() => {
                    frame(dx, dy, 1);
                })
            }

            end = end && steps != 0;

            for (var i = 0, l = this.listeners.length; i < l; i++) {

                if (this.listeners[i]({
                        dx,
                        dy,
                        end
                    })) {
                    this.GO = false;
                } 
            }
        }

        this.event_b = (e) => {

            time_old = performance.now();

            var touch = e.touches[touchid];

            this.velocity_x = this.origin_x - touch.clientX;
            this.velocity_y = this.origin_y - touch.clientY;

            this.origin_x = touch.clientX;
            this.origin_y = touch.clientY;

            frame(this.velocity_x, this.velocity_y, 0, 0);
        }

        this.event_c = (e) => {

            let time_new = performance.now();

            let diff = time_new - time_old;

            let steps = Math.min(diff / 8.6666666, 1 / this.drag); // 60 FPS

            this.GO = true;

            frame(this.velocity_x, this.velocity_y, steps);

            this.velocity_x = 0;
            this.velocity_y = 0;

            window.removeEventListener("touchmove", this.event_b);
            window.removeEventListener("touchend", this.event_c);
        }

        this.event_a = (e) => {

            if(!this.GO){
                e.preventDefualt();
                e.stopPropagation();
                return false;
            }

            time_old = performance.now();

            this.GO = false;

            var touch = e.touches[touchid];

            if (!touch)
                return;

            this.origin_y = touch.clientY;
            this.origin_x = touch.clientX;

            window.addEventListener("touchmove", this.event_b);
            window.addEventListener("touchend", this.event_c);
        }

        this.element.addEventListener("touchstart", this.event_a);

        this.listeners = [];

    }

    destructor() {
        this.listeners = null;
        this.element.removeEventListener("touchstart", this.event_a);
    }



    addEventListener(callback) {
        if (callback instanceof Function) {

            for (var i = 0; i < this.listeners.length; i++) {
                if (this.listeners[i] == callback) return
            }

            this.listeners.push(callback);
        }
    }

    removeEventListener(callback) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == callback) {
                this.listeners.splice(i, 1);
                return;
            }
        }
    }
}

export {
    TouchScroller
}