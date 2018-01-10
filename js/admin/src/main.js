import { extend } from 'flarum/extend';
import OnlineSettingsModal from 'antoinefr/online/components/OnlineSettingsModal';

app.initializers.add('antoinefr-online', function() {
    app.extensionSettings['antoinefr-online'] = () => {
        app.modal.show(new OnlineSettingsModal());
    }
});
