// Porcentaje de recoil que aplicaremos
const recoilFactor = 0.60;

// Función para aplicar recoil
function applyRecoil() {
    const playerPed = PlayerPedId(); // Obtiene el Ped del jugador
    const weaponHash = GetSelectedPedWeapon(playerPed); // Obtiene el arma actual

    if (weaponHash !== null && weaponHash !== 0) {
        // Calcular el recoil aleatorio
        const pitch = Math.random() * recoilFactor * 2 - recoilFactor;
        const heading = Math.random() * recoilFactor * 2 - recoilFactor;

        // Aplica el retroceso a la cámara
        const currentPitch = GetGameplayCamRelativePitch();
        const currentHeading = GetGameplayCamRelativeHeading();
        SetGameplayCamRelativePitch(currentPitch + pitch, 0.2);
        SetGameplayCamRelativeHeading(currentHeading + heading);
    }
}

// Hilo principal que verifica cuando el jugador está disparando
setTick(() => {
    const playerPed = PlayerPedId(); // Obtiene el Ped del jugador

    // Comprueba si el jugador está disparando
    if (IsPedShooting(playerPed)) {
        applyRecoil(); // Aplica el recoil
    }

    // Esperar un frame para evitar sobrecarga
     Wait(0);
});
