import axios from 'axios';

const API_URL = 'http://localhost:3000/tts';

export const speakVietnamese = async (text) => {
    if (!text) return;
    
    try {
        // Gọi đến backend của mình, backend sẽ gọi FPT.AI
        const response = await axios.post(API_URL, { text });
        
        // console.log('Backend TTS response:', response.data);

        if (response.data && response.data.async) {
            const audioUrl = response.data.async;
            // console.log('Playing audio from:', audioUrl);
            
            const audio = new Audio(audioUrl);
            
            try {
                await audio.play();
            } catch (playError) {
                console.error('Audio playback failed:', playError);
                console.warn('Browser might have blocked autoplay or the URL is invalid/expired.');
            }
        } else {
            console.error('Invalid TTS response:', response.data);
            throw new Error('Invalid response from TTS service: ' + (response.data.message || 'No URL'));
        }
    } catch (error) {
        console.error('Error calling TTS Proxy:', error);
        throw error;
    }
};