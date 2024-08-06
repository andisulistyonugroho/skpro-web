import mitt from 'mitt';
export default defineNuxtPlugin(() => {
    type Events = {
        waitDialog: boolean,
        errorSnack: Error,
        okSnack: { color: string, message: string },
        openDrawer?: boolean
    }
    const emitter = mitt<Events>();
    return {
        provide: {
            bus: {
                $on: emitter.on,
                $emit: emitter.emit,
                $off: emitter.off
            },
        },
    };
});