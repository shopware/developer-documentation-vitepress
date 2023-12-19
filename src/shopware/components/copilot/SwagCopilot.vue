<template>
  <div class="SwagCopilot SwagCopilot_container">
    <SwagIcon icon="times" class="SwagCopilot_icon-close"/>

    <SwagIcon icon="sparkles" type="solid" class="SwagCopilot_icon-copilot --animation-up"/>

    <h3 class="SwagCopilot_heading --animation-up">AI Copilots</h3>

    <div v-if="!state" class="SwagCopilot_container">
      <p class="--animation-top --animation-delay-1">Instead of searching, you can ask AI Copilot to find what you are
        looking for.</p>

      <p class="--animation-top --animation-delay-2">Example prompts:</p>
      <div class="SwagCopilot_examples --animation-top --animation-delay-2">
        <div class="SwagCopilot_example c-any-card"
             v-for="example in examples"
             @click.prevent="searchExample(example)"
        >"{{ example }}"
        </div>
      </div>

      <div class="items-center flex flex-col gap-3">
        <p class="--animation-up --animation-delay-3">Give it a try!</p>
        <SwagIcon icon="long-arrow-down" class="SwagCopilot_icon-down --animation-up --with-bounce --animation-delay-3"/>
      </div>
    </div>

    <div v-if="state === 'pending'" class="SwagCopilot_container --animation-top">
      <span class="--custom-spinner --animation-spin"/>
      <!--<SwagIcon icon="spinner-star" type="solid" class="--animation-spin"/>-->
      <p>Working ...</p>
      <p class="SwagCopilot_example">"{{ question }}"</p>
      <button type="button" class="btn --subtle --sm" @click.prevent="stop">
        <SwagIcon icon="square" type="solid"/>
        Stop
      </button>
    </div>

    <div class="SwagCopilot_container c-flat-card p-6 --animation-top" v-if="state === 'done'">
      <p class="SwagCopilot_example">"{{ question }}"</p>

      <div v-html="markdown" class="SwagCopilot_markdown"></div>

      <ul v-if="response.sources.length" class="grid gap-2 text-left">
        <li v-for="source in response.sources">
          <PageRef :page="`${source.slice(0, -2)}html`.replace('/index.html', '/')"/>
        </li>
      </ul>
    </div>

    <div class="SwagCopilot_searchbox-wrapper --animation-top"
         :class="`--animation-delay-${state === 'done' ? '1' : '4'}`"
         v-if="state !== 'pending'"
         :key="`searchbox-${state}`">
      <textarea class="form-control"
                v-model="query"
                :ref="el => queryRef = el"
                @keydown.enter="requestAnswer"
                placeholder="Enter the question"></textarea>
      <button type="button" class="btn --primary --xs" @click.prevent="requestAnswer">Ask</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {watch, ref} from "vue";
import {qa} from "./ml";
import render from "./markdown";

const props = defineProps({
  collection: {
    type: String,
  }
});

const {
  query,
  question,
  state,
  pending,
  response,
  errorText,
  requestAnswer,
  marked,
  stop,
} = qa(props.collection);

const examples = [
  'What is the code for adding a primary button?',
  'What icons can I use to represent the shopping cart?',
  'List me the slots of the SW-Card',
];

const searchExample = example => {
  query.value = question.value = example;
  requestAnswer();
}

const resize = (element, minHeight = 46) => {
  if (!element) {
    return;
  }
  element.style.height = `${minHeight}px`;
  element.style.height = (element.scrollHeight > minHeight ? element.scrollHeight : minHeight) + "px";
}

// textarea watcher
const queryRef = ref(null);
const resizeQueryRef = () => resize(queryRef.value);
watch(queryRef, resizeQueryRef);
watch(query, resizeQueryRef, {deep: true});
watch(state, resizeQueryRef)

// markdown answer rendering
const markdown = ref(null);
watch(
    () => response.value?.answer,
    async () => {
      const myMarkdown = response.value?.answer || '';
      try {
        markdown.value = await render(myMarkdown);
      } catch (e) {
        console.error(e);
        markdown.value = myMarkdown
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
      }
    }
)
</script>

<style lang="scss">
.SwagCopilot {
  @apply fixed right-0 bottom-0;
  top: var(--vp-nav-height);

  &_container {
    @apply flex gap-8 flex-col content-center text-center items-center;
  }

  &.--inline {
    @apply static mx-auto py-4;
    width: 100%;
    max-width: min(48rem, 80vw);

    .SwagCopilot {
      &_icon-close {
        @apply hidden;
      }

      &_examples {
        @apply flex flex-col gap-4 w-full text-left;
      }

      &_example {
        @apply p-4 font-medium cursor-pointer font-italic;
      }
    }
  }

  &_icon {
    &-copilot {
      color: var(--sw-c-blue-brand);
      --icon-size: 3rem;
    }

    &-down {
      --icon-size: 1.5rem;
    }
  }

  &_heading {
    font-family: Inter;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.625rem; /* 150% */
    letter-spacing: 0.00625rem;
  }

  &_searchbox-wrapper {
    @apply w-full relative;
    .form-control {
      @apply flex w-full px-[.5rem] py-[.666rem] pr-[4.5rem];
      resize: none;
      overflow: hidden;
    }

    .btn {
      @apply absolute right-[.5rem] bottom-[.5rem];
    }
  }

  &_markdown {
    @apply text-left;
    max-width: 46rem;
    :not(pre) > code {
      font-weight: bold;
    }
    pre code {
      max-width: 100%;
      overflow: auto;
      display: block;
      @apply p-4;
    }
    ul {
      list-style: disc;
      margin-left: 1rem;
    }
    > * {
      margin-block-end: .5rem;
    }
  }
}

.--animation-delay-0 {
  --animation-delay: .125s;
}

.--animation-delay-1 {
  --animation-delay: .25s;
}

.--animation-delay-2 {
  --animation-delay: .75s;
}

.--animation-delay-3 {
  --animation-delay: 1s;
}

.--animation-delay-4 {
  --animation-delay: 1.25s;
}

// delay is used as a duration in first animation and delay for the second animation
.--animation-up {
  animation: var(--animation-delay, 0s) ease 0s 1 disappear, .5s ease-out var(--animation-delay, 0s) 1 slideInFromTop;
  &.--with-bounce {
    animation: var(--animation-delay, 0s) ease 0s 1 disappear,
    .5s ease-out var(--animation-delay, 0s) 1 slideInFromTop,
    2s ease-out var(--animation-delay, 0s) 3 bounce;
  }
}

.--animation-spin {
  animation-name: spin;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  // fix the border bug
  border: 1px solid var(--vp-c-bg);
}

.--custom-spinner {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 5px solid transparent;
  background: linear-gradient(var(--vp-c-bg), var(--vp-c-bg)), conic-gradient(from 0.15turn, var(--vp-c-bg), var(--sw-c-blue-brand));
  background-origin: border-box;
  background-clip: content-box, border-box;
}

@keyframes disappear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translateY(-2rem);
  }
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(-2rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInFromTop {
  0% {
    transform: translateY(2rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  70% { transform:translateY(0%); }
  80% { transform:translateY(25%); }
  90% { transform:translateY(0%); }
  95% { transform:translateY(10%); }
  97% { transform:translateY(0%); }
  99% { transform:translateY(5%); }
  100% { transform:translateY(0); }
}
</style>