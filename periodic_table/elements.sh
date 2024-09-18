#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --tuples-only -c"

if [[ -z $1 ]]
  then
    echo Please provide an element as an argument.
else
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    ELEMENT_INFO_NUM=$($PSQL "SELECT elements.atomic_number, elements.symbol, elements.name, properties.atomic_mass, properties.melting_point_celsius, properties.boiling_point_celsius, types.type FROM elements INNER JOIN properties ON elements.atomic_number=properties.atomic_number INNER JOIN types ON properties.type_id=types.type_id WHERE elements.atomic_number=$1;")
    
    if [[ $ELEMENT_INFO_NUM ]]
      then
        echo "$ELEMENT_INFO_NUM" | while read NUMBER BAR SYMBOL BAR NAME BAR MASS BAR MP BAR BP BAR TYPE 
        do
          echo "The element with atomic number $NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MP celsius and a boiling point of $BP celsius."
        done
    else 
      echo I could not find that element in the database.
    fi
  else
    ELEMENT_INFO_SYM=$($PSQL "SELECT elements.atomic_number, elements.symbol, elements.name, properties.atomic_mass, properties.melting_point_celsius, properties.boiling_point_celsius, types.type FROM elements INNER JOIN properties ON elements.atomic_number=properties.atomic_number INNER JOIN types ON properties.type_id=types.type_id WHERE elements.symbol=INITCAP('$1');")
    if [[ $ELEMENT_INFO_SYM ]]
      then
        echo "$ELEMENT_INFO_SYM" | while read NUMBER BAR SYMBOL BAR NAME BAR MASS BAR MP BAR BP BAR TYPE 
        do
          echo "The element with atomic number $NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MP celsius and a boiling point of $BP celsius."
        done
    fi
    ELEMENT_INFO_NAME=$($PSQL "SELECT elements.atomic_number, elements.symbol, elements.name, properties.atomic_mass, properties.melting_point_celsius, properties.boiling_point_celsius, types.type FROM elements INNER JOIN properties ON elements.atomic_number=properties.atomic_number INNER JOIN types ON properties.type_id=types.type_id WHERE elements.name=INITCAP('$1');")
    if [[ $ELEMENT_INFO_NAME ]]
      then
        echo "$ELEMENT_INFO_NAME" | while read NUMBER BAR SYMBOL BAR NAME BAR MASS BAR MP BAR BP BAR TYPE 
        do
          echo "The element with atomic number $NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MP celsius and a boiling point of $BP celsius."
        done
    fi
    if [[ -z $ELEMENT_INFO_NAME && -z $ELEMENT_INFO_SYM && -z $ELEMENT_INFO_NUM ]]
    then
      echo I could not find that element in the database.
    fi
  fi
    #ELEMENT_INFO_SYM
  #
fi
