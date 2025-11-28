<template>
  <div>
    <h2>Edit Word</h2>
    <word-form @createOrUpdate="createOrUpdate" :word="word"></word-form>
  </div>
</template>
<script>
import WordForm from '@/components/WordForm.vue';
import { api } from '@/helpers/helpers.js';
import { showFlash } from '@/helpers/flash';

export default {
  name: 'edit',
  components: {
    'word-form': WordForm
  },
  data: function() {
    return {
      word: {}
    };
  },
  //call api to get word
  async mounted() {
    this.word = await api.getWord(this.$route .params.id);
  },  
  methods: {
    createOrUpdate: async function(word) {
      await api.updateWord(word);
      showFlash('Word updated successfully!', 'success');
      //redirect to word detail page
      this.$router.push(`/words/${word._id}`);
    }
  }
}
</script>
