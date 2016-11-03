require 'sinatra'


get "/layout" do   
  erb :layout 
end

get '/home' do    
  erb :home  
end

get "/gallery" do   
  erb :gallery 
end

get "/mission_risks" do   
  erb :mission_risks 
end

get "/contact" do   
  erb :contact 
end





