<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">kun</h1>
      <p class="tagline">(Arabic: <span class="arabic-text">كُن</span>, "Be") — the command to become.</p>
      <p class="description">Declare intent. Generate implementation. Ship code that reads the way you <span class="underline">intended</span>.</p>

      <div class="demo">
        <div class="demo-panel" :class="{ active: panelsVisible }">
          <div class="panel-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="panel-title">users.ts.kun</span>
          </div>
          <div class="panel-body">
            <div class="line" v-for="i in maxIntentLines" :key="'i' + i">
              <span
                class="line-text"
                :class="{ visible: visibleIntentLines >= i }"
                :style="{ transitionDelay: `${(i - 1) * 0.08}s` }"
              >{{ currentIntentLines[i - 1] || '\u00a0' }}</span>
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

        <div class="demo-panel" :class="{ active: panelsVisible }">
          <div class="panel-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="panel-title">users.ts</span>
          </div>
          <div class="panel-body">
            <div class="line" v-for="i in maxCodeLines" :key="'c' + i">
              <span
                class="line-text code-text"
                :class="{ visible: visibleCodeLines >= i }"
                :style="{ transitionDelay: `${(i - 1) * 0.05}s` }"
              ><span v-html="currentCodeLines[i - 1] ?? '&amp;nbsp;'"></span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="stage-dots">
        <span
          v-for="(_, i) in stages"
          :key="'dot' + i"
          class="stage-dot"
          :class="{ active: currentStage >= i && phase !== 'idle' }"
        ></span>
      </div>
      <p class="sub-tagline">Update your intent. Rebuild. The code evolves with your requirements.</p>
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
const currentIntentLines = ref<string[]>([])
const currentCodeLines = ref<string[]>([])
const currentStage = ref(0)
const panelsVisible = ref(false)

interface Stage {
  intent: string[]
  code: string[]
}

const stages: Stage[] = [
  // Stage 1: Just GET /users
  {
    intent: [
      '@target typescript',
      '@module express router',
      '',
      'GET /users → list all users',
    ],
    code: [
      '<span class="hl-kw">import</span> { Router } <span class="hl-kw">from</span> <span class="hl-str">\'express\'</span>',
      '',
      '<span class="hl-kw">const</span> router = <span class="hl-fn">Router</span>()',
      '',
      'router.<span class="hl-fn">get</span>(<span class="hl-str">\'/users\'</span>, <span class="hl-kw">async</span> (req, res) =&gt; {',
      '  <span class="hl-kw">const</span> users = <span class="hl-kw">await</span> db.<span class="hl-fn">findAll</span>()',
      '  res.<span class="hl-fn">json</span>(users)',
      '})',
    ],
  },
  // Stage 2: Add GET /users/:id
  {
    intent: [
      '@target typescript',
      '@module express router',
      '',
      'GET /users → list all users',
      'GET /users/:id → single user or 404',
    ],
    code: [
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
    ],
  },
  // Stage 3: Add POST /users
  {
    intent: [
      '@target typescript',
      '@module express router',
      '',
      'GET /users → list all users',
      'GET /users/:id → single user or 404',
      'POST /users → create user from body',
    ],
    code: [
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
      '  <span class="hl-kw">const</span> user = <span class="hl-kw">await</span> db.<span class="hl-fn">create</span>(req.body)',
      '  res.<span class="hl-fn">status</span>(<span class="hl-num">201</span>).<span class="hl-fn">json</span>(user)',
      '})',
    ],
  },
  // Stage 4: Add constraints
  {
    intent: [
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
    ],
    code: [
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
    ],
  },
]

const maxIntentLines = Math.max(...stages.map(s => s.intent.length))
const maxCodeLines = Math.max(...stages.map(s => s.code.length))

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function runStage(stageIndex: number) {
  const stage = stages[stageIndex]
  const prevIntentCount = stageIndex > 0 ? stages[stageIndex - 1].intent.length : 0
  const prevCodeCount = stageIndex > 0 ? stages[stageIndex - 1].code.length : 0

  currentStage.value = stageIndex
  currentIntentLines.value = stage.intent
  panelsVisible.value = true

  // Phase 1: show intent panel, type new lines
  phase.value = 'intent'
  // Instantly show previously typed lines
  visibleIntentLines.value = prevIntentCount
  await sleep(200)
  // Type new lines one by one
  for (let i = prevIntentCount; i <= stage.intent.length; i++) {
    visibleIntentLines.value = i
    await sleep(300)
  }

  await sleep(600)

  // Phase 2: transform arrow
  phase.value = 'transform'
  await sleep(800)

  // Phase 3: show result code — update code array now so old lines don't shift during intent typing
  currentCodeLines.value = stage.code
  phase.value = 'result'
  // Instantly show previously generated code
  visibleCodeLines.value = prevCodeCount
  await sleep(100)
  // Type new code lines
  for (let i = prevCodeCount; i <= stage.code.length; i++) {
    visibleCodeLines.value = i
    await sleep(60)
  }
}

async function runAnimation() {
  await sleep(600)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let i = 0; i < stages.length; i++) {
      await runStage(i)
      await sleep(2000)
    }

    // Pause on the final result, then reset and loop
    await sleep(3000)
    phase.value = 'idle'
    panelsVisible.value = false
    visibleIntentLines.value = 0
    visibleCodeLines.value = 0
    currentIntentLines.value = []
    currentCodeLines.value = []
    await sleep(1000)
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
  font-family: 'Arial Unicode MS', 'Tahoma', sans-serif;
}

.tagline {
  font-size: 1.25rem;
  color: #d4d4d4;
  margin-bottom: 1rem;
  font-weight: 500;
}

.description {
  font-size: 1.1rem;
  color: #a3a3a3;
  margin-bottom: 2.5rem;
}

.underline {
  text-decoration: underline;
  text-underline-offset: 3px;
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
  height: 1.6em;
  line-height: 1.6em;
}

.line-text {
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #a3a3a3;
  white-space: pre;
  display: inline-block;
  height: 1.6em;
  line-height: 1.6em;
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

/* Stage dots */
.stage-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stage-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #333;
  transition: background 0.3s ease;
}

.stage-dot.active {
  background: #f59e0b;
}

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
