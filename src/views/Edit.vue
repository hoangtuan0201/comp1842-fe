<template>
  <div>
    <h2>Edit Word</h2>
    <word-form @createOrUpdate="createOrUpdate" :word="word"></word-form>
  </div>
</template>
<script>
import WordForm from '@/components/WordForm.vue';
import { api } from '@/helpers/helpers.js';

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
      alert('Word updated successfully!');
      //redirect to word detail page
      this.$router.push(`/words/${word._id}`);
    }
  }
}
</script>
