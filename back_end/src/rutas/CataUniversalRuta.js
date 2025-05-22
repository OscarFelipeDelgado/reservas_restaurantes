//module.exports = CataUniversalModelo;

const express = require('express');
const router = express.Router();
 
var CataUniversalModelo = require('../modelos/CataUniversalModelo');
 


module.exports = function()
{
    // Para llamar el método de mostrar todos los registros del Catalogo Universal
    router.get("/", function (req, res)
    {

        CataUniversalModelo.getCatalogoUsT(function (error, data)
        {
            if(typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
            }
            else{
                res.json(404,
                    {
                        "msg": "registro no existe"
                    });
            }
        });
    });
  

    // Para llamar el método de mostrar un tipo de Catalogo
    router.get("/:tipoCatalogo", function (req, res)
    {

        var tipoCatalogo = req.params.tipoCatalogo;

        if(!isNaN(tipoCatalogo))
        {

            CataUniversalModelo.getTipoCatalogoUs(tipoCatalogo, function (error, data)
            {
                if(typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                else{
                    res.json(404,
                        {
                            "msg": "registro no existe"
                        });
                }
            });
        }
        else{
            res.status(500).json({"msg": "error"})    
        }
    });
    
    // Para llamar el método de crear un tipo de Catalogo
    router.post("/", function (req, res){

            var TipDocData = {
                Id_Catalogo: null,
                Tipo_Catalogo: req.body.Tipo_Catalogo,
                Valor_Catalogo: req.body.Valor_Catalogo
            };

            CataUniversalModelo.InsertarCataUniv(TipDocData, function(error, data){
                    if(data)
                    {
                        res.status(200).json(data);
                    }
                    else
                    {
                        res.status(500).send({ error: "boo:(" })
                    }

                }
            )

        }
    )

    // Para llamar el método de modificar un tipo de Catalogo
    router.put("/", function (req, res){

            var TipDocData = {
                Id_Catalogo: req.body.Id_Catalogo,
                Tipo_Catalogo: req.body.Tipo_Catalogo,
                Valor_Catalogo: req.body.Valor_Catalogo
            };

            CataUniversalModelo.ModificarCataUniv(TipDocData, function(error, data){
                    if(data && data.msg)
                    {
                        res.status(200).json(data);
                    }
                    else
                    {
                        res.status(500).send({ error: "Fallaste bro :/" })
                    }

                }
            )

        }
    )

    return router;
}
 
 