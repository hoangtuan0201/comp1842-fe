<template>
  <div>
    <h1>New Word</h1>
    <word-form @createOrUpdate="createOrUpdate"></word-form>
  </div>
</template>
<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';
import { showFlash } from '@/helpers/flash';
export default  {
  name: 'new-word',
  components: {
    'word-form': WordForm
  },
  methods: {
    createOrUpdate: async function(word) {
      const res = await api.createWord(word);
      showFlash('Word created', 'success');
      //redirect to word detail page
      this.$router.push(`/words/${res._id}`);
    }
  }
}
</script>
