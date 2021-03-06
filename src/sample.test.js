

describe('navigator.mediaDevices', function () {
    console.log('Hello from mediaDevices', navigator.mediaDevices);

    beforeEach(() => {
        console.log(window.location.href);
    })

    it('should be defined', function () {
        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.enumerateDevices
        ) {
            console.warn(
                "enumerateDevices() not supported.",
                window.location.href
            );
        }
        expect(navigator.mediaDevices)
    });

    it('enumerateDevices - should return --fake-ui-devices from browser args', async function () {
        let devices = await navigator.mediaDevices.enumerateDevices()
        devices.forEach(function (device) {
            console.log('[DEVICE]', device.kind, device.label);
            expect(device.kind).to.not.be.null;
        });
    });
});
