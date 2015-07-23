
// This needed for bootstrap beautiful and userful tooltips:
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});


// This provides ajax favorites toggling:
$(function () {
    if (window.act) {

        // all features attached to .talk-checkbox class:
        $('.talk-checkbox').click( function(e){
            e.stopPropagation();

            // local helpers:
            // ajax saver for data:
            var save_inversion = function(talk_id, state, ok_callback) {
                $.post(act.make_uri('ye2015', 'updatemytalks_a'), {talk_id: talk_id, state: state},
                    ok_callback);
            };
            // this one was proposed with modifications into Act handlers:
            // var save_inversion = function(talk_id, state, ok_callback) {
            //     $.post(act.make_uri('ye2015', 'updatemytalks_as'), {talk_id: talk_id, state: state},
            //         ok_callback);
            // };

            // tooltip text to negated updater on toggling:
            var update_tooltip = function(el) {
                var savedTitle = el.data('titlerev');
                var tt = el.tooltip('fixTitle');
                if(tt) {
                    // that's do some real hackings to get into tooltip guts
                    el.data('titlerev', tt.data('bs.tooltip').$tip.find('.tooltip-inner').text() );
                    el.attr('data-original-title', savedTitle)
                    el.tooltip('hide');
                } else {
                    el.data('titlerev', el.attr('title'));
                    el.attr('title', savedTitle);
                }
            };

            // on click on this checkbox-item (mostly it's 'a' tag in code) we toggle it:
            var cb = $(this);
            if( cb.data('talkfav') == 1 ) {
                save_inversion(cb.data('talkid'), 0, function(e){
                    update_tooltip(cb);
                    cb.data('talkfav','0');
                    cb.find('img').attr('src', '/ye2015/img/no-fav-3.png');
                    if(cb.data('needreload'))
                        setTimeout(function(){ location.reload(); }, 300);
                });
            } else {
                save_inversion(cb.data('talkid'), 1, function(e){
                    update_tooltip(cb);
                    cb.data('talkfav','1');
                    cb.find('img').attr('src', '/ye2015/img/fav-3.png');
                    if(cb.data('needreload'))
                        setTimeout(function(){ location.reload(); }, 300);
                });
            }

            // can be removed, was helper to debug:
            console.log( cb.data('talkid'), cb.data('talkfav') );

            return false;
        });
    } else {
        console.log('No act.js!');
    }
});
