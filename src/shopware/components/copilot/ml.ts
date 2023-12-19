import {ref} from "vue";
import { marked } from 'marked';

export const qa = (collection) => {
    let query = ref(null);
    let pending = ref(false);
    let question = ref(null);
    let response = ref({
        answer: '',
    });
    let errorText = ref(false);
    let state = ref(null);
    let stopping = ref(false);

    let requestAnswer = () => {
        pending.value = true;
        errorText.value = false;
        state.value = 'pending';
        question.value = query.value;
        fetch('https://ai-ml.fly.dev/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: query.value,
                collection: collection,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (stopping.value) {
                    return;
                }
                response.value = data;
                pending.value = false;
                state.value = 'done';
            })
            .catch(error => {
                if (stopping.value) {
                    return;
                }
                console.log(error)
                errorText.value = error;
                pending.value = false;
                state.value = 'error';
            });
    }

    let stop = () => {
        stopping.value = true;
        state.value = null;
        pending.value = false;
    }

    return {
        requestAnswer,
        response,
        pending,
        query,
        question,
        errorText,
        marked,
        state,
        stop,
    };
}