
import {expect} from "@esm-bundle/chai";
import { doBar, getUserMedia } from './sample';

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

describe('foo', () => {
    it('should run', () => {
        expect(doBar('test'));
    })
})

describe('getUserMedia', () => {
    it('should run', async () => {
        let s = await getUserMedia();

        expect(s);
        console.log(s);

    })
})

describe('iframe', () => {
    let iframe = document.createElement('iframe');

    beforeEach(() => {
        document.body.appendChild(iframe);
        iframe.id = 'testiframe';
        iframe.src = "iframe.html";
    });

    it('should have iframe', () => {
        let f = document.querySelector('iframe');
        expect(f)
    })
})



