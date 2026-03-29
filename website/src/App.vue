<template>
  <div id="app">
    <NavBar />
    <HeroSection />
    <WhatIsKun />
    <InstallSection />
    <HowItWorks />
    <WriteWhatNotHow />
    <ProvidersSection />
    <GitSyncContract />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import WhatIsKun from './components/WhatIsKun.vue'
import InstallSection from './components/InstallSection.vue'
import HowItWorks from './components/HowItWorks.vue'
import WriteWhatNotHow from './components/WriteWhatNotHow.vue'
import ProvidersSection from './components/ProvidersSection.vue'
import GitSyncContract from './components/GitSyncContract.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #0a0a0a;
  color: #e5e5e5;
}

code {
  font-family: "JetBrains Mono", monospace;
}

#app {
  min-height: 100vh;
}
</style>