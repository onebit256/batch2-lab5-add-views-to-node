
$(function () {
    indexLayer.init();
})

var indexLayer = {
	
	init:function(){
		layui.use('element', function(){
		  var element = layui.element;
		  
		});
		
		$(".layui-nav-item .layui-nav-child a").on("click",function(el){
			var url = $(this).data("url");
			if(url){
				$(".layui-body .qkl-container").load(url);
			}
			
		})
		
		$(".index-init").click();
	}
			
}