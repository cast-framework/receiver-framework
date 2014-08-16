$(CastFramework).ready(function() {
    CastFramework.start('urn:x-cast:com.davidtschida.android.cards');
    $(document.body).css("background-color", "#1693A5");
    $('#status').text("it's working! yay!");
});