<template>
    <main>
        <div>
            <h1>{{ loremWords(10) }} h1</h1>
            <h2>{{ loremWords(10) }} h2</h2>
            <h3>{{ loremWords(10) }} h3</h3>
            <h4>{{ loremWords(10) }} h4</h4>
            <h5>{{ loremWords(10) }} h5</h5>
            <h6>{{ loremWords(10) }} h6</h6>

            <h1>{{ loremWords(10) }}</h1>
            <p>{{ loremSentences() }}</p>

            <h2>{{ loremWords(10) }}</h2>
            <p>{{ loremSentences() }}</p>

            <h3>{{ loremWords(10) }}</h3>
            <p>{{ loremSentences() }}</p>

            <h4>{{ loremWords(10) }}</h4>
            <p>{{ loremSentences() }}</p>

            <h5>{{ loremWords(10) }}</h5>
            <p>{{ loremSentences() }}</p>

            <h6>{{ loremWords(10) }}</h6>
            <p>{{ loremSentences() }}</p>

            <PageRef :title="loremWords()" :sub="loremSentences(1)" page="/" />

            <p>{{ loremSentences() }}</p>

            <PageRef :title="loremWords()" :sub="loremSentences(1)" page="/" />
            <PageRef :title="loremWords()" :sub="loremSentences(1)" page="/" />

            <p>{{ loremSentences() }}</p>
        </div>
    </main>
</template>

<script setup lang="ts">
import {loremWords, loremSentences} from "../stories/helpers";
import PageRef from "./PageRef.vue";
</script>