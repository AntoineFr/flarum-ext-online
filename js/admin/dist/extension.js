System.register('antoinefr/online/components/OnlineSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
    'use strict';

    var SettingsModal, OnlineSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }],
        execute: function () {
            OnlineSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(OnlineSettingsModal, _SettingsModal);

                function OnlineSettingsModal() {
                    babelHelpers.classCallCheck(this, OnlineSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(OnlineSettingsModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(OnlineSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('antoinefr-online.admin.settings.title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                app.translator.trans('antoinefr-online.admin.settings.titleoflist')
                            ),
                            m('input', { required: true, className: 'FormControl', type: 'text', bidi: this.setting('antoinefr-online.titleoflist') }),
                            m(
                                'label',
                                null,
                                app.translator.trans('antoinefr-online.admin.settings.displaymax')
                            ),
                            m('input', { required: true, className: 'FormControl', type: 'number', bidi: this.setting('antoinefr-online.displaymax') })
                        )];
                    }
                }]);
                return OnlineSettingsModal;
            })(SettingsModal);

            _export('default', OnlineSettingsModal);
        }
    };
});;
System.register('antoinefr/online/main', ['flarum/extend', 'antoinefr/online/components/OnlineSettingsModal'], function (_export) {
    'use strict';

    var extend, OnlineSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_antoinefrOnlineComponentsOnlineSettingsModal) {
            OnlineSettingsModal = _antoinefrOnlineComponentsOnlineSettingsModal['default'];
        }],
        execute: function () {

            app.initializers.add('antoinefr-online', function () {
                app.extensionSettings['antoinefr-online'] = function () {
                    app.modal.show(new OnlineSettingsModal());
                };
            });
        }
    };
});