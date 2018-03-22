
set :deploy_to, "/home/newsilkroad/webroot/#{fetch(:application)}"        # 设置部署目录
set :deploy_user, 'newsilkroad'            # 设置部署时的用户

set :stage, :production       # 设置 stage
set :branch, 'master'         # 设置 git branch
set :rails_env, :production   # 设置 rails_env


set :deploy_to, "/home/#{fetch(:deploy_user)}/webroot/#{fetch(:application)}"        # 设置部署目录
#config for resque
set :workers, { "#{fetch(:application)}_resque_queue_name" => 2 }
set :resque_environment_task, true
# config for resque
# role :resque_worker, '192.168.1.1'
# role :resque_scheduler, '192.168.1.1'

# PUMA
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,   "#{shared_path}/tmp/pids/puma.pid"
set :puma_bind, "unix:///tmp/#{fetch(:application)}.sock"      #根据nginx配置链接的sock进行设置，需要唯一
set :puma_conf, "#{shared_path}/puma.rb"
set :puma_access_log, "#{shared_path}/log/puma_error.log"
set :puma_error_log, "#{shared_path}/log/puma_access.log"
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, 'production'))
set :puma_threads, [2, 4]
set :puma_workers, 4
set :puma_init_active_record, false
set :puma_preload_app, true
set :puma_prune_bundler, true

server '50.63.13.218', user: 'newsilkroad', roles: %w(web app db), primary: true,password:'Ganshi123!@#'