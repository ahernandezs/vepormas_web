FROM nginx
MAINTAINER Jose Castaneyra <jcastaneyra@gmail.com>
COPY site_conf/default.conf /etc/nginx/conf.d/default.conf
COPY SPA/dist/ /usr/share/nginx/html
EXPOSE 80
