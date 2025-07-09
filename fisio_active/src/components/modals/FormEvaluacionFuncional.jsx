import React from "react";
/**
 * FormEvaluacionFuncional
 * Paso de evaluación funcional dentro del Wizard.
 *
 * Props:
 *  - values   : objeto global con todos los campos
 *  - onChange : (patch) => void          → actualiza valores en el padre
 *  - onNext   : () => void               → botón siguiente
 *  - onPrev   : () => void               → botón anterior
 */
export default function FormEvaluacionFuncional({values, onChange,onNext,onPrev}){
    const v = values;
    const handle = (e) => {
        const {name,value} = e.target;
        onChange({[name]: value});
    };
    const patchTabla=(clave,grado)=>{
        onchange({
            tablaFuerzaMuscular: {
                ...(v.tablaFuerzaMuscular || ""),
                [clave]:String(grado),
            },
        
        });
    };
    return(
        <div className="space-y-4">
            {/*Marcha,equilibrio,ROM,FUERZA,ETC*/}
            <RadioGroup label="Marcha" name="marcha" value={v.marcha_estado} options={["Normal","Alterada"]} onchange={handle}></RadioGroup>
            {v.marcha === "Alterada" && (
                <input type="text" className="marcha_descripcion" name="marchaDescripcion" placeholder="Describa la alteracion" value={v.marcha_descripcion || ""} onChange={handle} />
            )}

            <RadioGroup label="Equilibrio" name="equilibrio" value={v.equilibrio_estado} options={["Bueno","Regular","Malo"]} onChange={handle}></RadioGroup>
            <RadioGroup label="Rango de movimiento" name="RangoMovimiento" value={v.rango_movimiento_estado} options={["Normal","Disminuido"]} onChange={handle}></RadioGroup>
            {v.rango_movimiento_estado === "Disminuido" && (
                <input className="form-control mb-3" type="text" name="rangoMovimientoAreas" placeholder="Areas Afectadas"  value={v.rango_movimiento_areas || " " } onChange={handle}/>
            )}
            {/* Tablas por valoracion por grupo*/}
            <TablGrupo>
                titulo="Miembro Superior"
                filas={[
                    ["hombroFlexion","Hombro: Flexion"],
                    ["hombroExtension", "Hombro:Extension"],
                    ["hombroAbduccion", "Hombro: Abduccion"],
                    ["codoFlexion","Codo: Flexion"],
                    ["codoExtension","Codo: Extension"],
                    ["munecaExtension", "Muneca: Extension"],
                    ["munecaFlexion","Muneca: Flexion"],
                    ["munecaAbduccion", "Muneca: Abduccion"],
                    ["dedosFlexion","Dedos: Flexion"],
                    ["dedosExtension", "Dedos:Extension"],
                    ["pulgar","Pulgar:Oposicion"],
                ]}
                data = {v.tablaFuerzaMuscular || {}}
                setval= {patchTabla}
            </TablGrupo>

            <TableGroup>
                titulo="Miembro Inferior"
                filas{[
                    ["caderaFlexion","Cadera:Flexion"],
                    ["caderaExtension","Cadera:Extension"],
                    ["caderaAbduccion","Cadera: Abduccion"],
                    ["caderaAduccion","Cadera: Abduccion"],
                    ["rodillaFlexion", "Rodilla: Flexion"],
                    ["rodillaExtension", "rodilla,Extension"],
                    ["tobilloDorsiflexion","Tobillo: Dorsiflexion"],
                    ["tobilloPlantiflexion", "Tobillo: Plantiflexion"],
                    ["pieInversion","Pie:Inversion"],
                    ["pieEversion","Pie Eversion"],
                                        
                    //ASK SOME MEDIC ABOUT THIS //
                ]}
                data = {v.tablaFuerzaMuscular || {}}
                setVal={patchTabla}
            </TableGroup>
 
            <TableGroup>

            </TableGroup>
        </div>
    )
};