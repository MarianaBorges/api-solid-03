# abri client do prisma 
npx prisma studio

# Gera uma migration 
npx prisma migrate dev

# inicia um container 
docker start (ID ou nome)

# ver todos os containers 
docker ps -a

# ver todos os containers que estão rodando
docker ps

# apagar um container
docker rm (nome)

# subir um container usando o compose
docker compose up -d

# subir um container usando o compose
docker compose stop