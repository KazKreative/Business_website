require 'sinatra'
require 'sendgrid-ruby'
require 'slim'
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

get "/star_date" do
  slim :star_date
end

post "/contact" do
  # p "My name is #{params[:name]} and I : #{params[:subject]}"

  p "SENDING EMAIL D:"
  p ENV['SENDGRID_API_KEY']

  from = Email.new(email: "#{params[:emailaddress]}")
  subject = "My name is #{params[:name]}, and I want to be shot into space!:"
  to = Email.new(email: 'contact@redstarfilmsnc.com')
  content = Content.new(type: 'text/plain', value: "#{params[:subject]}")
  mail = Mail.new(from, subject, to, content)
  sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
  response = sg.client.mail._('send').post(request_body: mail.to_json)

  
  p response.status_code
  p response.body
  p response.headers



	p params.inspect
	@msg = "Thanks #{params[:name]}! Your email has been sent."
	erb :contact
end

