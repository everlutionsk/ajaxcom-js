/**
 * todo:
 * - handleClick -> check if protocol matches
 * - history pushes -> resolve
 * - submitHandle -> test GET vs POST serialization
 */

(function ($) {
    "use strict";

    $.ajaxcomProperties = {isPopstateEvent: false};


    var ajaxcomStackOptions = {};
    var ajaxcomLastPushId = null;

    $(window).on('popstate.ajaxcom', function (event) {
        if (typeof event.state === 'object' && event.state !== null) {
            if (event.state.ajaxcomPushId == null || ajaxcomStackOptions[ajaxcomLastPushId] == undefined) {
                window.location.reload();
            } else {
                $.ajaxcomProperties.isPopstateEvent = true;
                ajaxcomStackOptions[ajaxcomLastPushId]['scrollTop'] = $(document).scrollTop();
                ajaxcomLastPushId = event.state.ajaxcomPushId;

                var firstOnComplete = {};
                if (ajaxcomStackOptions[ajaxcomLastPushId]['scrollTop'] != null) {
                    firstOnComplete = {
                        firstOnComplete: function () {
                            $(document).scrollTop(ajaxcomStackOptions[ajaxcomLastPushId]['scrollTop']);
                        }
                    };
                }

                ajaxcom($.extend(true, {}, ajaxcomStackOptions[ajaxcomLastPushId]['options'], firstOnComplete));
            }
        }
    });
    history && history.replaceState && history.replaceState({}, null);

    function ajaxcom(options) {

        var defaults = {
            dataType: 'json',
            beforeSend: function (xhr, settings) {},
            success: function (data, status, xhr) {},
            complete: function (jqXHR, textStatus) {
                $.ajaxcomProperties.isPopstateEvent = false;
            }
        };

        return $.ajax(options);
    }

    // Handle change urls
    function handleChangeUrl(options, ajaxcomOptions) {

        // case 'push':
        if ($.ajaxcomProperties.isPopstateEvent) {
            break;
        }

        var scrollPosition = $(document).scrollTop();

        changeUrl = function () {
            // this condition is needed to prevent form resubmiting
            var currentUrlHref = window.location.href + window.location.search;
            var currentUrlPath = window.location.pathname + window.location.search;
            if (currentUrlHref != options.url
                && currentUrlPath != options.url
            ) {
                if (ajaxcomLastPushId != null) {
                    ajaxcomStackOptions[ajaxcomLastPushId]['scrollTop'] = scrollPosition;
                }
                ajaxcomLastPushId = new Date().getTime() + options.url;
                ajaxcomStackOptions[ajaxcomLastPushId] = {options: ajaxcomOptions};
                history && history.pushState && history.pushState(
                    {
                        ajaxcomPushId: ajaxcomLastPushId
                    },
                    null,
                    options.url
                );
            }
        };
    }

})(jQuery);
