
window.onload = () => {if ($('#pagination').length) {
    $.get(`/comment/get-all-comment/${$("#product_id").val()}`, function (data) {
        $(function () {
            let container = $('#pagination');
            
            data = data.comment;
            console.log("hi", data);
            container.pagination({
                
                dataSource: data,
                pageSize: 4,
                callback: function (data, pagination) {
                    // console.log((data));
                    var dataHtml = '';

                    $.each(data, function (index, item) {

                        dataHtml += `<div class='comment-author-infos pt-25'> <span> ${item.author} </span> <em> ${item.time} </em> <p> ${item.content} </p> </div>`
                    });
                    $("#data-container").html(dataHtml);
                }
            })
        })
    })
}}

$("#review-submit").on("click", function (event) {
    event.preventDefault();
    $.post(
        `/comment/add-comment`,
        {
            content: $("#comment-content").val(),
            product_id: $("#product_id").val(),
            user_id: $("#user_id").val()
        },
        function (data) {

            $(function () {
                let container = $('#pagination');

                container.pagination({
                    dataSource: data,
                    pageSize: 3,
                    callback: function (data, pagination) {
                        var dataHtml = '';

                        $.each(data, function (index, item) {
                            // dataHtml += '<li>' + item.name + '</li>';
                            dataHtml += `<div class='comment-author-infos pt-25'> <span> ${item.author} </span> <em> ${item.time} </em> <p> ${item.content} </p> </div>`
                        });

                        $("#data-container").html(dataHtml);
                    }
                })
            })

            $("#review-area").empty();
            $("html, body").animate(
                {
                    scrollTop: $("#reviews").offset().top - 100,
                },
                500
            );
        }
    )
        .fail(function (data) {
            if (data.status === 401) {
                window.location.href = `/?redirect=${window.location.href}`;
            }
        });
});