#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --tuples-only -c"
GET_RANDOM=$(($RANDOM%(1000-1+1)+1))
#GET_RANDOM=500
echo Enter your username:
read USER_NAME

PLAY_GAME() {
  
  echo $1
  read GUESS_VALUE
  if [[ $GUESS_VALUE =~ ^[0-9]+$ ]]
  then
    if [[ $GUESS_VALUE > $GET_RANDOM ]]
    then
    
      PLAY_GAME "It's lower than that, guess again:" $(($2+1))
    elif [[ $GUESS_VALUE < $GET_RANDOM ]]
    then
      
      PLAY_GAME "It's higher than that, guess again:" $(($2+1))
    else
      echo You guessed it in $(($2+1)) tries. The secret number was $GET_RANDOM. Nice job!
      INSERT_RECORD $2+1
    fi
  else
    PLAY_GAME "That is not an integer, guess again:" $2
  fi
}
INSERT_RECORD() {
  VERIFY_UPDATE_GAMES=$($PSQL "UPDATE users SET games_played=games_played+1 WHERE user_name='$USER_NAME';")
  VERIFY_UPDATE_SCORE=$($PSQL "UPDATE users SET best_game=$1 WHERE user_name='$USER_NAME' AND ($1 < best_game OR best_game=0);")
}

VERIFY_USER_NAME=$($PSQL "SELECT user_name, games_played, best_game FROM users WHERE user_name='$USER_NAME';")

if [[ -z $VERIFY_USER_NAME ]]
then
  echo Welcome, $USER_NAME! It looks like this is your first time here.
  VERIFY_USER_INSERT=$($PSQL "INSERT INTO users(user_name, games_played, best_game) VALUES('$USER_NAME', 0, 0);")
  if [[ -z $VERIFY_USER_INSERT ]]
    then
      echo Something went wrong.
  else
    PLAY_GAME "Guess the secret number between 1 and 1000:" 0
  fi
else
  echo "$VERIFY_USER_NAME" | while read NAME BAR GAMES BAR BEST
  do 
    echo "Welcome back, $NAME! You have played $GAMES games, and your best game took $BEST guesses."
  done
  PLAY_GAME "Guess the secret number between 1 and 1000:" 0
fi

