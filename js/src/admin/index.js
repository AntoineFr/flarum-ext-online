import app from 'flarum/app';

app.initializers.add('antoinefr-online', () => {
    app.extensionData.for('antoinefr-online')
        .registerSetting(
            {
                setting: 'antoinefr-online.titleoflist',
                label: app.translator.trans('antoinefr-online.admin.settings.titleoflist'),
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'antoinefr-online.displaymax',
                label: app.translator.trans('antoinefr-online.admin.settings.displaymax'),
                type: 'number'
            }
        );
});
