<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">kun</h1>
      <div class="arabic-text">كُن فَيَكُونُ</div>
      <p class="tagline">"Be, and it is" — the imperative form of existence.</p>

      <div class="demo">
        <div class="demo-panel" :class="{ active: phase === 'intent' || phase === 'transform' || phase === 'result' }">
          <div class="panel-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="panel-title">users.ts.kun</span>
          </div>
          <div class="panel-body">
            <div class="line" v-for="(line, i) in intentLines" :key="'i' + i">
              <span
                class="line-text"
                :class="{ visible: visibleIntentLines > i }"
                :style="{ transitionDelay: `${i * 0.08}s` }"
              >{{ line }}</span>
            </div>
          </div>
        </div>

        <div class="demo-arrow" :class="{ active: phase === 'transform' || phase === 'result' }">
          <div class="arrow-label">kun build</div>
          <div class="arrow-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        <div class="demo-panel" :class="{ active: phase === 'result' }">
          <div class="panel-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="panel-title">users.ts</span>
          </div>
          <div class="panel-body">
            <div class="line" v-for="(line, i) in codeLines" :key="'c' + i">
              <span
                class="line-text code-text"
                :class="{ visible: visibleCodeLines > i }"
                :style="{ transitionDelay: `${i * 0.05}s` }"
              ><span v-html="line"></span></span>
            </div>
          </div>
        </div>
      </div>

      <p class="sub-tagline">You state intent. Kun translates it into real code.</p>
      <div class="button-group">
        <a href="#install" class="btn btn-primary">Get started</a>
        <a href="https://github.com/seyyidt/kun-js" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const phase = ref<'idle' | 'intent' | 'transform' | 'result'>('idle')
const visibleIntentLines = ref(0)
const visibleCodeLines = ref(0)

const intentLines = [
  '@target typescript',
  '@module express router',
  '',
  'GET /users → list all users',
  'GET /users/:id → single user or 404',
  'POST /users → create user from body',
  '',
  'constraints:',
  '  - validate email format on create',
  '  - return JSON, proper status codes',
]

const codeLines = [
  '<span class="hl-kw">import</span> { Router } <span class="hl-kw">from</span> <span class="hl-str">\'express\'</span>',
  '',
  '<span class="hl-kw">const</span> router = <span class="hl-fn">Router</span>()',
  '',
  'router.<span class="hl-fn">get</span>(<span class="hl-str">\'/users\'</span>, <span class="hl-kw">async</span> (req, res) =&gt; {',
  '  <span class="hl-kw">const</span> users = <span class="hl-kw">await</span> db.<span class="hl-fn">findAll</span>()',
  '  res.<span class="hl-fn">json</span>(users)',
  '})',
  '',
  'router.<span class="hl-fn">get</span>(<span class="hl-str">\'/users/:id\'</span>, <span class="hl-kw">async</span> (req, res) =&gt; {',
  '  <span class="hl-kw">const</span> user = <span class="hl-kw">await</span> db.<span class="hl-fn">findById</span>(req.params.id)',
  '  <span class="hl-kw">if</span> (!user) <span class="hl-kw">return</span> res.<span class="hl-fn">status</span>(<span class="hl-num">404</span>).<span class="hl-fn">json</span>({ <span class="hl-attr">error</span>: <span class="hl-str">\'Not found\'</span> })',
  '  res.<span class="hl-fn">json</span>(user)',
  '})',
  '',
  'router.<span class="hl-fn">post</span>(<span class="hl-str">\'/users\'</span>, <span class="hl-kw">async</span> (req, res) =&gt; {',
  '  <span class="hl-kw">if</span> (!<span class="hl-fn">isValidEmail</span>(req.body.email))',
  '    <span class="hl-kw">return</span> res.<span class="hl-fn">status</span>(<span class="hl-num">400</span>).<span class="hl-fn">json</span>({ <span class="hl-attr">error</span>: <span class="hl-str">\'Invalid email\'</span> })',
  '  <span class="hl-kw">const</span> user = <span class="hl-kw">await</span> db.<span class="hl-fn">create</span>(req.body)',
  '  res.<span class="hl-fn">status</span>(<span class="hl-num">201</span>).<span class="hl-fn">json</span>(user)',
  '})',
]

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function runAnimation() {
  await sleep(600)

  // Phase 1: type intent
  phase.value = 'intent'
  for (let i = 0; i <= intentLines.length; i++) {
    visibleIntentLines.value = i
    await sleep(300)
  }

  await sleep(800)

  // Phase 2: transform
  phase.value = 'transform'
  await sleep(1000)

  // Phase 3: show result (intent panel stays visible)
  phase.value = 'result'
  for (let i = 0; i <= codeLines.length; i++) {
    visibleCodeLines.value = i
    await sleep(80)
  }
}

onMounted(() => {
  runAnimation()
})
</script>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
  line-height: 1.1;
}

.arabic-text {
  font-size: 2rem;
  color: #a3a3a3;
  margin-bottom: 1.5rem;
  font-family: 'Arial Unicode MS', 'Tahoma', sans-serif;
  letter-spacing: 0.1em;
}

.tagline {
  font-size: 1.25rem;
  color: #d4d4d4;
  margin-bottom: 2.5rem;
  font-weight: 500;
}

.sub-tagline {
  font-size: 1.1rem;
  color: #a3a3a3;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Demo animation */
.demo {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  text-align: left;
}

.demo-panel {
  flex: 1;
  min-width: 0;
  background: #141414;
  border: 1px solid #262626;
  border-radius: 0.75rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.demo-panel.active {
  opacity: 1;
  transform: translateY(0);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #1a1a1a;
  border-bottom: 1px solid #262626;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.panel-title {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color: #737373;
  font-family: 'JetBrains Mono', monospace;
}

.panel-body {
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow: hidden;
}

.line {
  min-height: 1.3em;
}

.line-text {
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #a3a3a3;
  white-space: pre;
}

.line-text.visible {
  opacity: 1;
}

.code-text {
  color: #e5e5e5;
}

/* Arrow */
.demo-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.5s ease;
  flex-shrink: 0;
}

.demo-arrow.active {
  opacity: 1;
}

.arrow-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #f59e0b;
  font-weight: 600;
}

.arrow-icon {
  color: #f59e0b;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Syntax highlighting */
:deep(.hl-tag) { color: #7dd3fc; }
:deep(.hl-attr) { color: #c4b5fd; }
:deep(.hl-str) { color: #a8cc8c; }
:deep(.hl-kw) { color: #c4b5fd; }
:deep(.hl-fn) { color: #7dd3fc; }
:deep(.hl-num) { color: #f59e0b; }

/* Buttons */
.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
  min-width: 140px;
}

.btn-primary {
  background-color: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

.btn-primary:hover {
  background-color: #d97706;
  border-color: #d97706;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  color: #e5e5e5;
  border-color: #525252;
}

.btn-secondary:hover {
  background-color: #1a1a1a;
  border-color: #737373;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 1.5rem;
    padding-top: 5rem;
  }

  .hero-title {
    font-size: 3rem;
  }

  .arabic-text {
    font-size: 1.5rem;
  }

  .demo {
    flex-direction: column;
  }

  .demo-panel {
    min-height: auto;
    width: 100%;
  }

  .demo-arrow {
    flex-direction: row;
  }

  .arrow-icon svg {
    transform: rotate(90deg);
  }

  .button-group {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .panel-body {
    font-size: 0.7rem;
  }
}
</style>
