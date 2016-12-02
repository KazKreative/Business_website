require 'sinatra'
require "sendgrid-ruby"
include SendGrid

get "/layout" do   
  erb :layout 
end

get "/home" do    
  erb :home  
end

get "/gallery" do   
  erb :gallery 
end

get "/mission_risks" do   
  erb :mission_risks 
end

get "/contact" do
 @contact ="contact form"  
  erb :contact 
end


get "/thank_you" do
  erb :thank_you
end

post "/contact" do
  puts "SENDING EMAIL D:"
  puts ENV['SENDGRID_API_KEY']

  from = Email.new(email: 'test@example.com')
  subject = 'Hello World from the SendGrid Ruby Library!'
  to = Email.new(email: 'contact@redstarfilmsnc.com')
  content = Content.new(type: 'text/plain', value: 'Hello, Email!')
  mail = Mail.new(from, subject, to, content)

  sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
  response = sg.client.mail._('send').post(request_body: mail.to_json)
  
  puts response.status_code
  puts response.body
  puts response.headers


	@title ="contact xyz"
	puts params.inspect
	@msg = "Thanks!"
	erb :contact

	puts "name" 
end
