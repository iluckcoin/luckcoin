class Globals


  # 返回响应消息
  # @param success:是否成功
  # @param code:结果代码(未用到)
  # @param message:消息
  # @param data:附加结果
  def self.do_response(success,code,message,data = nil)
    {success:success,code:code,message:message,data:data}
  end
  
end