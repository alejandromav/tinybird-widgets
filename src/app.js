import Card from './components/card';

(async () => {
    customElements.define('tb-card', Card);
    // Detect if service workers enabled
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register(new URL('service-worker.js', import.meta.url),{type: 'module'});
            console.log('Service Worker Registered');
        } catch (error) {
            console.log('Service Worker Register Failed');
        }
    }
})();
