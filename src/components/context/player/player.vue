<template>
  <div class="player">
    <div class="small-player">
    </div>
    <div class="player-bar">
      <audio src="" id="myAudio"></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player'
}
</script>

<style scoped>
.player {
  position: absolute;
  /* top:  calc(100% - 50px); */
  bottom: 0;
  height: 50px;
  width: 1200px;
}
.small-player {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 240px;
  height: 50px;
  background-color: pink;
  z-index: 99;
}
.player-bar {
  height: 50px;
  background-color: coral;
}
</style>