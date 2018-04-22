import SettingsModal from 'flarum/components/SettingsModal';

export default class OnlineSettingsModal extends SettingsModal {
    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans('antoinefr-online.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                <label>{app.translator.trans('antoinefr-online.admin.settings.titleoflist')}</label>
                <input required className="FormControl" type="text" bidi={this.setting('antoinefr-online.titleoflist')}></input>
                <label>{app.translator.trans('antoinefr-online.admin.settings.displaymax')}</label>
                <input required className="FormControl" type="number" bidi={this.setting('antoinefr-online.displaymax')}></input>
            </div>
        ];
    }
}