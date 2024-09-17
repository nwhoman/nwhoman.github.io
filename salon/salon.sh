#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ Salon Appointment Scheduler ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  SERVICES=$($PSQL "SELECT service_id, name FROM services;")
  echo "$SERVICES" | while read SERVICE_ID BAR NAME
          do
            echo "$SERVICE_ID) $NAME"
          done
  
  read SERVICE_ID_SELECTED
  CONFIRM_SELECTION=$($PSQL "SELECT service_id FROM services WHERE service_id=$SERVICE_ID_SELECTED;")
  if [[ -z $CONFIRM_SELECTION ]]
    then
      MAIN_MENU "Please pick a valid option."
  else
    
    echo "Please enter your phone number in the format (xxx-xxx-xxxx)"
    read CUSTOMER_PHONE
    CONFIRM_PHONE_NUMBER=$($PSQL "SELECT customer_id, name FROM customers WHERE phone='$CUSTOMER_PHONE';")
    if [[ -z $CONFIRM_PHONE_NUMBER ]]
      then
        GET_NAME $CUSTOMER_PHONE
    else
      GET_APPOINTMENT $CUSTOMER_PHONE
      

    fi

  fi
}
GET_NAME() {
  echo You are not in our customer database. Please enter your full name to create an account.
  read CUSTOMER_NAME
  
  if [[ $CUSTOMER_NAME == "" ]]
    then
      GET_NAME $1
  else
    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$1', '$CUSTOMER_NAME');")
    if [[ -z $INSERT_CUSTOMER_RESULT ]]
        then
          echo -e "Something went wrong.\n"
    else
      GET_APPOINTMENT $1
    fi
  fi
}
GET_APPOINTMENT() {
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE';")
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE';")
  SERVICE=$($PSQL "SELECT name FROM services WHERE service_id='$SERVICE_ID_SELECTED';")
  echo $CUSTOMER_NAME, what time do you want to be seen?
  read SERVICE_TIME
  if [[ $SERVICE_TIME != "" ]]
    then
      INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME');")
      if [[ -z $INSERT_APPOINTMENT_RESULT ]]
        then
          echo -e "Something went wrong.\n"
      else
        echo "I have put you down for a$SERVICE at $SERVICE_TIME,$CUSTOMER_NAME."

      fi
  else
    GET_APPOINTMENT $1
  fi
}
MAIN_MENU "Welcome to the online appointment scheduler, how may I help you?"