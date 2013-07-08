Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['OMNIAUTH_PROVIDER_KEY'], ENV['OMNIAUTH_PROVIDER_SECRET']
end
