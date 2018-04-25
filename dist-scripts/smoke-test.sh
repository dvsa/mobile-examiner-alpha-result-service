http=$(curl -s -o /dev/null -w "%{http_code}" -i -X POST  -H "Content-Type: application/json" -d '{"candidateId": "someCandidateId","faults":[{"id":"juncSpeed","faultsNo":10,"isSerious":false,"isDangerous":false}]}' "${RESULT_API_URL}")
echo "$http"

if [[ "$http" == 201 ]];
  then
  echo "Success"
else
  echo "Unsuccessful"
  exit 1
fi
