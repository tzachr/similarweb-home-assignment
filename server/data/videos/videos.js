var Videos = function () {
    this.data = [];
}

Videos.prototype.data;

Videos.prototype.addVideo = function(video) {
    this.data.push(video);
}

Videos.prototype.removeVideo = function(id) {
    this.data = this.data.filter(video => video.id !== id);
}

Videos.prototype.updateVideos = function(videos) {
    this.data = videos;
}

module.exports = Videos;