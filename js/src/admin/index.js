import { extend } from 'flarum/extend';
import OnlineSettingsModal from './components/OnlineSettingsModal';

app.initializers.add('antoinefr-online', function() {
    app.extensionSettings['antoinefr-online'] = () => {
        app.modal.show(new OnlineSettingsModal());
    }
});
