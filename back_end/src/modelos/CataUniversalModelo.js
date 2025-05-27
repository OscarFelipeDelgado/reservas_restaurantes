const conexion = require('../conexion');
const connection = require('../conexion');
 
var CataUniversalModelo = {};
 
///////////////////////////////////////////////////////////////
CataUniversalModelo.getCatalogoUsT = function ( callback)
{
    if(connection)
    {
        var sql =   
                    "SELECT  Cata.`Id_Catalogo`, "+
                            "Cata.`Valor_Catalogo`,  "+
                            "Tipo.`Valor_Catalogo` AS Tipo_Catalogo "+
                            
                    "FROM `catalogo_universal` AS Cata "+
                       "INNER JOIN `catalogo_universal` AS Tipo ON Cata.`Tipo_Catalogo` = Tipo.`Id_Catalogo`" + 
                       "ORDER BY `Valor_Catalogo`;";
 
        connection.query(sql, function (error, rows)
        {
 
            if (error)
            {
                throw error;
            }
            else
            {
                //debuelve las filas como un Json
                callback(null, rows);

                //comvierte las filas Json a una cadena de texto para Angular
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
CataUniversalModelo.getId_CatalogoUs = function (Id_Catalogo, callback)
{
    if(connection)
    {
        var sql = "SELECT `Id_Catalogo`, `Tipo_Catalogo`, `Valor_Catalogo` FROM `catalogo_universal` WHERE `Id_Catalogo` = " + connection.escape(Id_Catalogo) + "ORDER BY `Valor_Catalogo`";
 
        connection.query(sql, function (error, rows)
        {
 
            if (error)
            {
                throw error;
            }
            else
            {
                //debuelve las filas como un Json
                callback(null, rows);

                //comvierte las filas Json a una cadena de texto para Angular
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}
 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
CataUniversalModelo.getTipoCatalogoUs = function (tipoCatalogo, callback)
{
    if(connection)
    {
        var sql = "SELECT `Id_Catalogo`, `Tipo_Catalogo`, `Valor_Catalogo` FROM `catalogo_universal` WHERE `Tipo_Catalogo` = " + connection.escape(tipoCatalogo) + "ORDER BY `Valor_Catalogo`";
 
        connection.query(sql, function (error, rows)
        {
 
            if (error)
            {
                throw error;
            }
            else
            {
                //debuelve las filas como un Json
                callback(null, rows);

                //comvierte las filas Json a una cadena de texto para Angular
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}
 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Metodo para insertar registros en el catalogo universal
CataUniversalModelo.InsertarCataUniv = function(CataUniData, callback)
{
    if(connection)
    {
        //el '?' lo hace dinamico
        var sql = "INSERT INTO catalogo_universal SET ?";

        connection.query(sql, CataUniData, function(error, result){

                if(error){
                    throw error;
                }
                else{
                    callback(null, {"msg": "Si logramos hacer el registro de otro catálogo universal!"});
                }

            }
        );
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Metodo para modificar registros en el catalogo universal
CataUniversalModelo.ModificarCataUniv = function(CataUniData, callback)
{
    if(connection)
    {
        var sql 
        = "UPDATE `catalogo_universal` SET `Tipo_Catalogo`= " + connection.escape(CataUniData.Tipo_Catalogo) 
        + ", `Valor_Catalogo`=" + connection.escape(CataUniData.Valor_Catalogo) 
        + " WHERE `Id_Catalogo` = " + connection.escape(CataUniData.Id_Catalogo) + ";";

        connection.query(sql, function(error, result){

                if(error){
                    throw error;
                }
                else{
                    callback(null, {"msg": "Registro actualizado!"});
                }

            }
        );
    }
}


module.exports = CataUniversalModelo;