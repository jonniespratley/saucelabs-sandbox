export function doBar(foo) {
    return foo + 'bar';
}

var constraints = (window.constraints = {
    audio: false,
    video: true,
});

export function getUserMedia() {
    return navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            var videoTracks = stream.getVideoTracks();
            console.log("Got stream with constraints:", constraints);
            console.log("Using video device: " + videoTracks[0].label);
            stream.onremovetrack = function () {
                console.log("Stream ended");
            };
            //video.srcObject = stream;
            return stream;
        });
}