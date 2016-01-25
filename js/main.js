'use strict';

var $ = require('jquery');

var Avlb = function () {
    this.$el = $('[avlb-root]');
    this.$regForm = this.$el.find('[avlb-register-user]');

    this.registerUser();
};

Avlb.prototype.registerUser = function () {
    var $username = this.$regForm.find('#username'),
        $useremail = this.$regForm.find('#useremail'),
        $formMessage = this.$regForm.find('[avlb-register-message]');

    this.$regForm.on('submit', function (e) {
        e.preventDefault();

        var data = {
            user: {
                email: $useremail.val(),
                name: $username.val()
            }
        };

        $.ajax({
            type: 'PUT',
            url: '/api/user',
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            error: function (data) {
                $formMessage
                    .text(data.responseJSON.message)
                    .show();

                console.log(data);
            },
            success: function (data) {
                $formMessage
                    .text(data.message)
                    .show();

                console.log(data);
            }
        });

        return false;
    });
};

$(function() {
    new Avlb();
});
