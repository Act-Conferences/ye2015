$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});


$(function () {
    if (window.act) {
        $('.talk-checkbox').click( function(e){
            e.stopPropagation();

            var save_inversion = function(talk_id, state, ok_callback) {
                $.post(act.make_uri('ye2015', 'updatemytalks_as'), {talk_id: talk_id, state: state},
                    ok_callback);
            };

            var update_tooltip = function(el) {
                var savedTitle = el.data('titlerev');
                var tt = el.tooltip('fixTitle');
                if(tt) {
                    el.data('titlerev', tt.data('bs.tooltip').$tip.find('.tooltip-inner').text() );
                    el.attr('data-original-title', savedTitle)
                    el.tooltip('hide');
                } else {
                    el.data('titlerev', el.attr('title'));
                    el.attr('title', savedTitle);
                }
            };

            var cb = $(this);
            if( cb.data('talkfav') == 1 ) {
                save_inversion(cb.data('talkid'), 0, function(e){
                    update_tooltip(cb);
                    cb.data('talkfav','0');
                    cb.find('img').attr('src', '/ye2015/img/no-fav-3.png');
                });
            } else {
                save_inversion(cb.data('talkid'), 1, function(e){
                    update_tooltip(cb);
                    cb.data('talkfav','1');
                    cb.find('img').attr('src', '/ye2015/img/fav-3.png');
                });
            }

            console.log( cb.data('talkid'), cb.data('talkfav') );

            return false;
        });
    } else {
        console.log('No act.js!');
    }
});
