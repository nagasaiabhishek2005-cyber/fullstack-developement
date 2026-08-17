# Create a task
curl -X POST http://localhost:5002/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"userId":"user1","title":"Complete MongoDB Assignment","priority":"High"}'

# Get tasks for user1
curl http://localhost:5002/api/tasks/user1